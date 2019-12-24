import { parseISO, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export const formatDistanceDateToNow = date => {
  return formatDistanceToNow(parseISO(date), {
    addSuffix: true,
    locale: pt,
  });
};
