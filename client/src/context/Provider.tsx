import React, { createContext, Dispatch, useState, ReactNode, useContext, useEffect } from 'react'
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router';

interface contextInterface {
     scoreBoard: typeof initialScoreBoard,
     setScoreBoard: Dispatch<any>,
     fetchQuestion(level: string): void,
     registerUser(userData: any): void,
     scorePost(scoreData: any): void,
     leaderBoard(): void,
     leaderBoardData: any,
     logout(): void,
     question: any[]
     user: any
}

export const ContextProviderG = createContext<contextInterface>({} as contextInterface);

export const useProvider = () => useContext(ContextProviderG);

export const initialScoreBoard = { correct: 0, wrong: 0, score: 0 }

const CProvider = ({ children }: { children: ReactNode }) => {
     const [user, setUser] = useState<any>({});
     const navigate = useNavigate()
     const [question, setQuestion] = useState<any>();
     const [scoreBoard, setScoreBoard] = useState<typeof initialScoreBoard>(initialScoreBoard)
     const [leaderBoardData, setLeaderBoardData] = useState<any>()

     const fetchQuestion = async (level = "Easy") => {
          const data = await axios.get(`/quiz?level=${level}`);
          console.log(data.data)
          setQuestion(data.data)
     }

     const registerUser = async (userData: any) => {
          try {
               const user: any = await axios.post("/user/add", userData);
               if (!user) return alert("Some thing went wrong");
               setUser(user.data)
               fetchQuestion(user?.level);
               setTimeout(() => {
                    navigate("/")
               }, 1000)
          } catch (error: any) {
               console.log('error: ', error.message);
          }
     }

     const scorePost = async (scoreData: any) => {
          try {
               await axios.post("/score/add", scoreData);
               navigate(("/leaderboard"))
          } catch (error: any) {
               console.log('error: ', error.message);
          }
     }

     const logout = () => {
          setUser({});
     }

     const leaderBoard = async () => {
          try {
               const data = await axios.get("/score");
               setLeaderBoardData(data);
          } catch (error) {
               console.log('error: ', error);
          }
     }

     return (
          <ContextProviderG.Provider value={{ setScoreBoard, leaderBoardData, user, scorePost, leaderBoard, logout, registerUser, scoreBoard, fetchQuestion, question }}>
               {children}
          </ContextProviderG.Provider>
     )

}


export default CProvider;