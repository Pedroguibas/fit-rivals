import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function (date: Date | string) {
  const d = new Date(date);

  if (differenceInDays(new Date(), d) >= 7) {
    return format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  return formatDistanceToNow(d, { locale: ptBR, addSuffix: true });
}
