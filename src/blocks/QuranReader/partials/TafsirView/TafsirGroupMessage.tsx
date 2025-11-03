import { useI18n } from '~/contexts'
import TafsirMessage from './TafsirMessage'

type TafsirGroupMessageProps = {
  from: string
  to: string
}

const TafsirGroupMessage = ({ from, to }: TafsirGroupMessageProps) => {
  const { t } = useI18n()

  return <TafsirMessage>{t('tafsir').translate('group-message', from, to)}</TafsirMessage>
}

export default TafsirGroupMessage
