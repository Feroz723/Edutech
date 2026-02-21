import * as chatService from '../services/chatService.js';

export const handleChatMessage = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        const aiResponse = await chatService.getAIChatResponse(message);

        res.json({
            success: true,
            data: {
                response: aiResponse
            }
        });
    } catch (error) {
        next(error);
    }
};
