
import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
  Text,
  Card,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

export default function App({ signOut, user }) {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
    >
      <Heading level={1} color="#333">Welcome, {user?.username || user?.email}</Heading>
      <Text variation="tertiary" marginBottom="2rem">
        Your profile details are listed below:
      </Text>

      <Divider orientation="horizontal" />

      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="2rem"
        marginTop="2rem"
        width="100%"
        maxWidth="800px"
      >
        {userProfiles.map((userProfile) => (
          <Card
            key={userProfile.id}
            variation="outlined"
            padding="1.5rem"
            borderRadius="1rem"
          >
            <Heading level={3}>{userProfile.email}</Heading>
            <Text color="gray">User ID: {userProfile.id}</Text>
          </Card>
        ))}
      </Grid>

      <Divider orientation="horizontal" margin="2rem 0" />

      <Button variation="primary" onClick={signOut}>
        Sign Out
      </Button>
    </Flex>
  );
}

