import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider, Button, Container, Paper, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const drawerWidth = 240;

function Teacherinterface() {
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [selectedSection, setSelectedSection] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeacherAge, setNewTeacherAge] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the teacher's name from localStorage
    const name = localStorage.getItem('TeacherName');
    const id = localStorage.getItem('TeacherId');
    if (name && id) {
      setTeacherName(name);
      setTeacherId(id);
    }
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setIsDrawerOpen(false); // Close the drawer when a section is selected
  };

  const handleLogout = () => {
    navigate('/teacherlogin');
    localStorage.removeItem('TeacherName');
    // Redirect to login page or wherever necessary
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleUpdateProfile = () => {
    setShowUpdateForm(true);
    setShowDeleteForm(false);
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteForm(true);
    setShowUpdateForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};
    if (newUsername) updatedFields.newUsername = newUsername;
    if (newTeacherAge) updatedFields.newage = newTeacherAge;
    if (newPassword) updatedFields.newpassword = newPassword;

    if (Object.keys(updatedFields).length === 0) {
      setMessage("Please fill in at least one field to update.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:8070/teacher/update", {
        teacherId: teacherId,
        ...updatedFields
      });

      if (response.data.status === "Update successful") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully!',
        });
        if (newUsername) {
          setTeacherName(newUsername);
          localStorage.setItem('TeacherName', newUsername);
        }
        setShowUpdateForm(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred',
      });
    }
  };