export default function ChatMessages(props) {
    const messages = props.data
    
    return (
        <div>
            {JSON.stringify(messages)}
        </div>
      )
  }