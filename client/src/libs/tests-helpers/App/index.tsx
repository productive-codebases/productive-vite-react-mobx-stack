import { useUrlBuilderInit } from '@/client/hooks/useUrlBuilderInit'

interface IAppProps {
  children: React.ReactNode
}

export default function App(props: IAppProps) {
  useUrlBuilderInit()

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{props.children}</>
}
