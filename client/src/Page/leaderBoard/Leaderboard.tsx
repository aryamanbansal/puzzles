import { Box, Center, Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { useProvider } from "../../context/Provider";
import axios from "axios";

interface Score {
  name: string;
  score: number;
}

const LeaderBoard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/score")
      .then((response) => {
        setScores(response.data);
      });
  }, []);
  scores.sort((a, b) => b.score - a.score);

  return (
    <div id="leaderboard_container">
      <img
        style={{ width: "100%", overflow: "auto", objectFit: "cover" }}
         src="https://t4.ftcdn.net/jpg/03/45/88/07/360_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg"
        // background-img = url(lb.jpg)
        alt="error"
      />
      <Box className="leader_box">
        <Center>
          <h1 className="leaderboard">Leaderboard</h1>
        </Center>
        <Table className="leader_scores" variant="simple" colorScheme="purple">
          <Thead>
            <Tr>
              <Th color="white" fontSize="large">
                Rank
              </Th>
              <Th color="white" fontSize="large">
                Name
              </Th>
              <Th color="white" fontSize="large">
                Score
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((score, index) => (
              <Tr key={index}>
                <Td fontSize="x-large" fontWeight="bold">
                  {index + 1}
                </Td>
                <Td fontSize="x-large" fontWeight="bold">
                  {score.name}
                </Td>
                <Td fontSize="x-large" fontWeight="bold">
                  {score.score}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};
export default LeaderBoard;
