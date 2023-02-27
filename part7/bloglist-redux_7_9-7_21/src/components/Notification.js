//import { filterChange } from '../reducers/notificationReducer'
import {  useSelector } from 'react-redux'

const Notification = () => {
  const notificacion = useSelector(state => state.notification)

  if (!notificacion.message) {
    return
  }

  const style = {
    color: notificacion.typeMessage==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notificacion.message}
    </div>
  )
}

export default Notification