import { removeFile } from '@/service/system'
import {
  Menu as CMenu,
  Item,
  Separator,
  Submenu,
  ItemParams
} from 'react-contexify'
import './index.scss'
import 'react-contexify/dist/ReactContexify.css'

type MenuProps = {
  id: string | number
}

export const Menu = (props: MenuProps) => {
  const toTrash = (args: ItemParams<any, any>) => {
    removeFile(args.props.file.id)
  }

  return (
    <CMenu id={props.id}>
      <Item disabled>Abrir</Item>
      <Submenu disabled label="Abrir com">
        <Item>Default app</Item>
      </Submenu>
      <Separator />
      <Item onClick={toTrash}>Mover para o lixo</Item>
      <Separator />
      <Item disabled>Obter informações</Item>
      <Item disabled>Renomear</Item>
      <Item disabled>Duplicar</Item>
      <Item disabled>Criar atalho</Item>
      <Separator />
      <Submenu disabled label="Ações rápidas">
        <Item>Sub Item 2</Item>
        <Item>Sub Item 3</Item>
      </Submenu>
    </CMenu>
  )
}
