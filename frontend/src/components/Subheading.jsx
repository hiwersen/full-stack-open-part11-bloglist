import { styleInitial } from '../styles'

const Subheading = ({ text }) => {
  const initial = text[0].toUpperCase()

  return (
    <h2 data-testid="blog-title">
      <span style={styleInitial}>{initial}</span>
      <span>{text.slice(1)}</span>
    </h2>
  )
}

export default Subheading
