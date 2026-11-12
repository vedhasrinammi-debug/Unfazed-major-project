const store = require('../data/memoryStore');

// @desc    Get all conversations grouped by client
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res) => {
  try {
    const clients = store.getClients(req.user._id);
    const conversations = clients.map(client => {
      const msgs = store.getMessages(req.user._id, client._id);
      const lastMessage = msgs.length > 0 ? msgs[msgs.length - 1] : null;
      const unreadCount = msgs.filter(m => m.sender === 'client' && !m.read).length;

      return {
        clientId: client._id,
        clientName: client.name,
        clientAvatar: client.avatar,
        clientDiagnosis: client.primaryDiagnosis,
        lastMessage: lastMessage ? lastMessage.text : 'No messages yet',
        lastMessageTime: lastMessage ? lastMessage.timestamp : client.createdAt,
        unreadCount
      };
    });

    res.json({
      success: true,
      conversations
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get messages for a specific client
// @route   GET /api/messages/:clientId
exports.getMessagesByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const messages = store.getMessages(req.user._id, clientId);
    // Mark as read
    store.markMessagesAsRead(req.user._id, clientId);

    res.json({
      success: true,
      client: {
        id: client._id,
        name: client.name,
        avatar: client.avatar,
        phone: client.phone,
        status: client.status,
        diagnosis: client.primaryDiagnosis
      },
      messages
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
  try {
    const { clientId, text, sender } = req.body;

    if (!clientId || !text) {
      return res.status(400).json({ success: false, message: 'Please provide clientId and message text' });
    }

    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const isTherapist = sender !== 'client';
    const newMsg = store.createMessage({
      therapistId: req.user._id,
      clientId,
      sender: isTherapist ? 'therapist' : 'client',
      senderName: isTherapist ? req.user.name : client.name,
      text: text.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Message delivered',
      msg: newMsg
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Simulate client response (Interactive Demo Feature)
// @route   POST /api/messages/:clientId/simulate-reply
exports.simulateClientReply = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const cannedReplies = [
      `Thank you Dr. Mitchell! That perspective really helps clarify what I was feeling. I'll add that to my thought log today.`,
      `Understood! I'll do the breathing exercises whenever I feel that chest tightness coming on before the presentation.`,
      `Thanks for following up! The boundary we set with my team worked well—I actually logged off on time yesterday without guilt.`,
      `Got it, Dr. Mitchell. See you at our scheduled appointment time!`
    ];

    const randomReply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];

    const simulatedMsg = store.createMessage({
      therapistId: req.user._id,
      clientId,
      sender: 'client',
      senderName: client.name,
      text: randomReply
    });

    res.json({
      success: true,
      message: 'Simulated client response received',
      msg: simulatedMsg
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
