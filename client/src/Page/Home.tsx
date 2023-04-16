import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useRef, useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useProvider } from '../context/Provider'
import Navbar from '../Components/Navbar/Navbar'
import Question from '../Components/Question/Question'
import { useNavigate } from 'react-router'

// axios.defaults.baseURL = "http://localhost:5500"
// axios.defaults.baseURL = "https://vast-plum-jaguar-shoe.cyclic.app"
axios.defaults.baseURL = "http://localhost:3000"


const initialTimer = { min: 0, sec: 30 }
function Home() {
     const navigate = useNavigate();
     const { fetchQuestion, question, logout } = useProvider()
     const QueMainContainerRef = useRef<HTMLDivElement>(null);
     const QuestionRef = useRef<HTMLDivElement>(null);
     const [time, setTime] = useState(initialTimer);
     const [reset, setReset] = useState(false);
     const [pause, setPause] = useState(false);
     const [qnum, setQnum] = useState(1);

     const timeString = useMemo(() => {
          return `${time.min < 10 ? "0" + time.min : time.min} : ${time.sec < 10 ? "0" + time.sec : time.sec} `
     }, [time])

     function scrollLeft() {
          setQnum(qnum + 1);
          setPause(false)
          resetTimer();
          QueMainContainerRef.current!.scrollLeft += QuestionRef.current!.clientWidth
     }

     function timeOver() {
          if (qnum >= 10) return stopTimer();
          console.log('qnum: ', qnum);
          clearInterval(interval);
          scrollLeft();
     }

     const resetTimer = () => {
          clearInterval(interval);
          setTime({ min: 0, sec: 30 });
          setReset(v => !v);
     }

     const stopTimer = () => {
          setPause(true)
     }

     var interval: number;
     useEffect(() => {
          console.log("reset", reset)
          interval = setInterval(() => {

               console.log('pause: ', pause);
               if (pause) return clearInterval(interval);

               if (time.sec === 0) {
                    if (time.min > 0) {
                         time.min--;
                         time.sec = 60
                    }
               }

               if (time.sec == 0 && time.min == 0) return timeOver();

               time.sec--;
               setTime({ min: time.min, sec: time.sec })

          }, 1000)
          return () => clearInterval(interval)
     }, [reset, pause])

     const { user } = useProvider()
     useEffect(() => {
          if (!user?.name) return navigate("/register")
     }, [user])



     return (
          <Box>
               <Box bg={'purple'} borderBottom={'2px'} borderColor='white' color={'white'} >
                    <Navbar />
               </Box>
               <Box w='80%' minH='100dvh' m='auto' display={'flex'} alignItems='center' justifyContent={'center'} >
                    <Box w='100%'>
                         {/* <Flex gap='20px'>
                              <Text w='10rem' textAlign={'center'} my='2' color='gold' fontSize={'1.5rem'} border={'2px'} borderColor='white' p='1' fontWeight={'semibold'} borderRadius={'10px'}>{timeString}</Text>
                         </Flex> */}
                         <Flex overflow={'hidden'} ref={QueMainContainerRef} w='100%' >
                              {question && question?.length > 0 &&
                                   question.map((ques, i) => (
                                        <Box key={ques._id} minW='100%' ref={QuestionRef} p='2'>
                                             <Question qn={i + 1} stopTimer={stopTimer} url={ques.url} scrollLeft={scrollLeft} question={ques.question} options={ques.option} answer={ques.correct} />
                                        </Box>
                                   ))
                              }
                         </Flex>
                    </Box>
               </Box >
          </Box >
     )
}

export default Home
