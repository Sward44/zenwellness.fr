"use server";

const posts = [
  {
    id: 1,
    title: "Lorem ipsum.",
    content:
      "nteger porttitor, dui id dapibus euismod, lacus felis tincidunt ante, sit amet eleifend metus enim in orci. Vivamus tincidunt eleifend leo, at scelerisque lacus viverra ac.",
  },
  {
    id: 2,
    title: "Lorem ipsum.",
    content:
      "In lacinia ipsum et lorem varius, eu porttitor eros porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
];

export default async function Post() {
  return (
    <div>
      <h1 className={`text-vert-foncer`}>My posts</h1>
      {posts.map((post) => (
        <span key={post.id}>
          {" "}
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </span>
      ))}
    </div>
  );
}
