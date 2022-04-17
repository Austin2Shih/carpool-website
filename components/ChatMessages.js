import styles from '../styles/message.module.css'
export default function ChatMessages(props) {
    const messages = props.data.messages
    const name1 = props.data.user1.name

    
    return (
        <div className={styles.super_container}>
            {
                messages.map((msg) => {
                    return (<div className={styles.container}>
                        <div className={styles.namebox}>
                            <p>{msg.name}</p>
                        </div>
                        <div className={styles.text_box}>
                            <p className={styles.text}>{msg.message}</p>
                        </div>
                    </div>)
                })
            }
        </div>
      )
  }