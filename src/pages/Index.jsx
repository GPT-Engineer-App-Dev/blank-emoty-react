import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState({ name: "", body: "" });

  const handleAddPost = () => {
    addPostMutation.mutate(newPost);
    setNewPost({ name: "", body: "" });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to Your React App</Text>
        <Text>This is an empty React application. Start building your features!</Text>
        <VStack spacing={4} width="100%">
          {posts && posts.map(post => (
            <Text key={post.id}>{post.name}: {post.body}</Text>
          ))}
        </VStack>
        <VStack spacing={4} width="100%">
          <input
            type="text"
            placeholder="Post Name"
            value={newPost.name}
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Post Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Button onClick={handleAddPost}>Add Post</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;