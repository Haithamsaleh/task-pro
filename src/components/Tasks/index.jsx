import React, { useState, useEffect } from "react";
import axios from "axios";

import {  AddIcon, SearchIcon ,DeleteIcon} from '@chakra-ui/icons'

import { Select,Button, Box,SimpleGrid,Text ,Checkbox, CheckboxGroup, IconButton, VStack, HStack, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
const Tasks = () => {
 const [tasks, setTasks] = useState([])
 const [isChecked, setIsChecked] = useState(false);




  const getTasks = async () => {
    const result = await axios.get(`http://localhost:5000/tasks`, {
      // headers: {
      //   Authorization: `Bearer ${state.token}`,
      // },
    });
    setTasks(result.data);
  };
  useEffect(() => {
    getTasks();

  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }


  const deletePost = async (id) => {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${state.token}`,
      // },
    });
    getTasks();
  };


  const doneByUserHandler = async (id, checked) => {
    const res = await axios.put(`http://localhost:5000/donebyuser/${id}`, {
      doneByUser: checked,
    });
    getTasks();
  };

  const doneByAdminHandler = async (id, checked) => {
    const res = await axios.put(`http://localhost:5000/donebyadmin/${id}`, {
      doneByAdmin: checked,
    });
    getTasks();
  };


  return (
    <>
    <SimpleGrid mt={9} spacingY='40px' columns={1} spacing={10}>
      {tasks.length === 0 ? (
        <>
          <Text>There are no tasks to display</Text>
        </>
      ) : (
        tasks.map((item, i) => {

          const isChecked = item.doneByUser;
          const isCheckedAdmin = item.doneByAdmin;
  
          return (
            
            <Box  key={item._id}>

             
               <Card >
                <CardHeader>

              <Text
                key={`title-${item._id}`}
                fontSize={{ base: "2xl", md: "3xl" }}
                mt={{ base: 2, md: 0 }}
                fontWeight="bold"
              >
                {item.titel}
              </Text>
                </CardHeader>
                 <CardBody >
 
              <Text
                key={`post-${item._id}`}
                fontSize={{ base: "2xl", md: "3xl" }}
                mt={{ base: 2, md: 0 }}
                fontWeight="bold"
              >
                {item.post}
              </Text>
              <Text
                key={`doneByUser-${item._id}`}
                fontSize={{ base: "2xl", md: "3xl" }}
                mt={{ base: 2, md: 0 }}
                fontWeight="bold"
              >
                {item.doneByUser}
              </Text>
              <Text
                key={`date-${item._id}`}
                fontSize={{ base: "2xl", md: "3xl" }}
                mt={{ base: 2, md: 0 }}
                fontWeight="bold"
              >
                {formatDate(item.date)}
              </Text>
              <Button
                color="gray.600"
                bg="white"
                onClick={() => {
                  deletePost(item._id);
                }}
              >
                <DeleteIcon />
              </Button>
              <Checkbox
                key={`checkbox-doneByUser-${item._id}`}
                value="naruto"
                isChecked={isChecked}
                onChange={(e) => {
                  doneByUserHandler(item._id, e.target.checked);
                }}
              >
                done by user
              </Checkbox>
              <Checkbox
                key={`checkbox-doneByAdmin-${item._id}`}
                value="naruto"
                isChecked={isCheckedAdmin}
                onChange={(e) => {
                  doneByAdminHandler(item._id, e.target.checked);
                }}
              >
                done by admin
              </Checkbox>
              </CardBody>
            </Card>
            </Box>
          );
        })
      )}
    </SimpleGrid>
    
   


  </>
  
   )
}

export default Tasks





