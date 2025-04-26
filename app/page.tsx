import { createPost, getPosts } from "./actions/postActions";

export default async function HomePage() {
  const posts = await getPosts();

  async function handleAddPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await createPost(title, content);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Posts</h1>

      <form action={handleAddPost} className="mb-8">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 mr-2"
          required
        />
        <input
          name="content"
          placeholder="Content"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Post
        </button>
      </form>

      <ul>
        {posts.map((post: any) => (
          <li key={post._id.toString()}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
