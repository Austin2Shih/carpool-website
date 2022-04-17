export default function ChatMessages(props) {
    const data = props.data
    const messages = data.messages
    return (
        <div>
            {JSON.stringify(messages)}
        </div>
      )
  }