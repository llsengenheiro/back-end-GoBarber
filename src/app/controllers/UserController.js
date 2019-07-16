import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User alredy exists' });
    }
    const { id, name, email, provaider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provaider
    });
  }

  async update(req, res) {
    console.log(req.body);

    const { email, oldPassword } = req.boby;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User alredy exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provaider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provaider
    });
  }
}
export default new UserController();
