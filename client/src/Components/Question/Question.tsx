import { Box, Button, Flex, Image, List, Text } from '@chakra-ui/react'
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { useProvider } from '../../context/Provider';
import useTimer from '../../hooks/useTimer';
import "./Question.css";

type Props = {
     qn: number,
     url: string,
     question: string,
     options: number[] | string[],
     answer: string,
     scrollLeft(): void,
     stopTimer(): void,
}

const list = ["A", "B", 'C', 'D']

function Question({ qn, question, url, options, answer, scrollLeft, stopTimer }: Props) {

     const { setScoreBoard, scoreBoard, scorePost, user } = useProvider()
     const [selectedValue, setSelectedValue] = useState<number | string>();

     function selectAnswer(value: string | number) {
          stopTimer();
          if (selectedValue) return;
          setSelectedValue(value);
     }

     const updateScore = () => {
          if (selectedValue == answer) {
               setScoreBoard((prev: { correct: number; score: number; }) => ({ ...prev, correct: prev.correct + 1, score: prev.score + 10 }))
          } else {
               setScoreBoard((prev: { wrong: number }) => ({ ...prev, wrong: prev.wrong + 1 }))
          }
     }

     const checkAnswer = (option: string | number) => {
          if (selectedValue == null) return;
          return answer === selectedValue && selectedValue === option ? "success" : ""
     }

     const checkWrongAnswer = (option: string | number) => {
          if (selectedValue == null) return
          if (answer == option) return "success ";
          return answer !== selectedValue && selectedValue === option ? "error" : ""
     }

     const scroll = () => {
          scrollLeft()
     }

     const submitData = () => {
          const data = { ...user, ...scoreBoard }
          scorePost(data);
     }

     useEffect(() => {
          if (!selectedValue) return
          updateScore()
     }, [selectedValue])

     return (
          <Box w='100%' overflowY='auto'>
               <Flex justify={'space-between'} gap='50px' flexDir={{ base: "column-reverse", sm: "column-reverse", lg: "row" }}>
                    <Box className='left' flex={1}>
                         <Flex className='question' data-type={""} data-qn={`${qn} / 5`} color={'whiteAlpha.800'} align={'center'} justify='center' textAlign={'center'} h='100px' fontSize={'1.3rem'} p='5' fontWeight={'semibold'}>
                              {question}
                         </Flex>
                         {options && options.map((option, i) => (
                              <Flex key={i} onClick={() => selectAnswer(option)} mt='10px' cursor={selectedValue ? "not-allowed" : "pointer"} className={`options ${checkAnswer(option)} ${checkWrongAnswer(option)}`} gap='10px' p='1' px='4' alignItems={'center'}>
                                   <Text fontSize={'1.5rem'} color='gold' className='list' whiteSpace={'nowrap'} fontWeight={'bold'}>{list[i]} :</Text>
                                   <Text fontSize={'1rem'} className='ans' color={'whiteAlpha.800'} fontWeight='semibold'>{option}</Text>
                              </Flex>
                         ))}
                    </Box>
                    <Flex className='right' w={{ base: "100%", sm: "100%", lg: "40%" }}>
                         {
                              url
                                   ?
                                   <Image objectFit={'contain'} objectPosition='center' src={url || 'https://static.voicethread.com/wp-uploads/2018/08/Screen-Shot-2018-08-15-at-10.49.00-AM.png'} />
                                   :
                                   <p>url is not working</p>
                         }
                    </Flex>
               </Flex >
               <Flex mt='50px' gap='20px' justify={'flex-end'}>
                    {qn !== 5 ?
                         <>
                              <Button isDisabled={selectedValue != null} variant={'outline'} border='2px solid white' color={'gold'} onClick={scroll}>Skip</Button>
                              <Button isDisabled={selectedValue == null} variant={'outline'} border='2px solid white' color={'gold'} onClick={scroll}>Next</Button>
                         </>
                         :
                         <Button variant={'outline'} border='2px solid white' color={'gold'} onClick={submitData}>Submit</Button>
                    }
               </Flex>
          </Box >
     )
}

export default Question