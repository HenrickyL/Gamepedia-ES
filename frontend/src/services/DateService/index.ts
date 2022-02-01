import {format} from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR'

export function formatDate(date: string, formatDate: string = "dd MMMM yyyy") {
    return format(
        new Date(date),
        formatDate,
        {locale:brLocale}
    )
}

