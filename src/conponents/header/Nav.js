

export async function Nav() {
  return <>
  {items.map(item => (
    <ul key={item.id}>
      <li></li>
    </ul>
  ))}</>;
}
