import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';

function ViewAssignmentdetails() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const courseName = localStorage.getItem('SelectedCourseName');
  const courseId = localStorage.getItem('SelectedCourseId');

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8070/assignment/getass?courseId=${courseId}`);
      setAssignments(response.data);
    } catch (error) {
      setError('Failed to retrieve assignments');
    }
  }, [courseId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date in 'MM/DD/YYYY' format by default
  };
