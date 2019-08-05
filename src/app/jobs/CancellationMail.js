import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    console.log(`A fila executou`);
    try {
      await Mail.sendMail({
        to: `${appointment.provider.name} <${appointment.provider.email}`,
        subject: 'Agendamento cancelado',
        template: 'cancellation',
        context: {
          provider: appointment.provider.name,
          user: appointment.user.name,
          date: format(
            parseISO(appointment.date),
            "dd 'de' MMMM', às' H:mm'h'",
            {
              locale: pt
            }
          )
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
export default new CancellationMail();
