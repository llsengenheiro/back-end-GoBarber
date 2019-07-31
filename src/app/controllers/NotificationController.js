import Notificattion from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provaider: true }
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }
    const notifications = await Notificattion.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notificattion.findById(req.params.id);

    const notification = await Notificattion.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // usado para enviar o retorno da notificação para o provider
    );

    return res.json(notification);
  }
}

export default new NotificationController();
