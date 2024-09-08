import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const courseName = localStorage.getItem('selectedCourseName');
  const courseId = localStorage.getItem('selectedCourseID');

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8070/assignment/getass?courseId=${courseId}`);
      setAssignments(response.data);
    } catch (error) {
    
    }
  }, [courseId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date in 'MM/DD/YYYY' format by default
  };
