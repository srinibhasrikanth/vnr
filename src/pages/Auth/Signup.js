import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MenuItem from "@mui/material/MenuItem";

const steps = ["Personal Details", "Parents Details", "Authentication"];

const Signup = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    // Section 1: Personal Details
    section1: {
      name: "",
      rollNo: "",
      year: "",
      branch: "",
      section: "",
      admission: "",
      gender: "",
      phoneNumber: "",
      whatsappNumber: "",
      personalEmail: "",
      currentAddress: "",
      permanentAddress: "",
      laptop: "",
    },
    // Section 2: Parents Details
    section2: {
      fatherName: "",
      fatherProfession: "",
      motherName: "",
      motherProfession: "",
      company: "",
      parentsAddress: "",
    },
    // Section 3: Authentication
    section3: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // State for the current form section
  const [currentSection, setCurrentSection] = useState(0);

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleEnterKey = (section, field, value) => {
    // Move to the next section when Enter key is pressed
    if (field === "confirmPassword" && value === "Enter") {
      handleNext();
    }
  };

  const handleNext = () => {
    // Move to the next section
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handleBack = () => {
    // Move to the previous section
    setCurrentSection((prevSection) => prevSection - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any additional logic here
  };

  // Styling
  const fieldStyle = {
    marginBottom: "20px",
    width: "100%", // Adjust width for smaller fields
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px", // Reduced width to fit side by side
    margin: "auto",
  };

  useEffect(() => {
    // Log form data whenever it changes for the current section
    console.log(`formData[section${currentSection + 1}]`);
  }, [currentSection]);

  return (
    <Grid container spacing={2} style={containerStyle}>
      <Grid item xs={12} sm={12}>
        <Card>
          <CardContent>
            <Stepper activeStep={currentSection} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography variant="h5" mb={2} style={{ fontWeight: "bold" }}>
              {steps[currentSection]}
            </Typography>
            {currentSection === 0 && (
              <>
                {/* Section 1: Personal Details */}
                <TextField
                  label="Name"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={!!formData.name?.error}
                  helperText={formData.name?.error}
                />
                <TextField
                  label="Roll No"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.rollNo}
                  onChange={(e) => handleInputChange("rollNo", e.target.value)}
                  error={!!formData.rollNo?.error}
                  helperText={formData.rollNo?.error}
                />
                <TextField
                  label="Which Year"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  error={!!formData.year?.error}
                  helperText={formData.year?.error}
                >
                  {[1, 2, 3, 4].map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Branch"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.branch}
                  onChange={(e) => handleInputChange("branch", e.target.value)}
                  error={!!formData.branch?.error}
                  helperText={formData.branch?.error}
                >
                  {[
                    "CSE",
                    "IT",
                    "ECE",
                    "EEE",
                    "Civil",
                    "Mechanical",
                    "CSE-AILML",
                    "CSE-CYS",
                    "CSE-AIDS",
                    "CSE-DS",
                  ].map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Section"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.section}
                  onChange={(e) => handleInputChange("section", e.target.value)}
                  error={!!formData.section?.error}
                  helperText={formData.section?.error}
                >
                  {["A", "B", "C", "D"].map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Admission"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.admission}
                  onChange={(e) =>
                    handleInputChange("admission", e.target.value)
                  }
                  error={!!formData.admission?.error}
                  helperText={formData.admission?.error}
                >
                  {["Regular", "BCAT", "NRI"].map((admission) => (
                    <MenuItem key={admission} value={admission}>
                      {admission}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Gender"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  error={!!formData.gender?.error}
                  helperText={formData.gender?.error}
                >
                  {["Male", "Female", "Other"].map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  error={!!formData.phoneNumber?.error}
                  helperText={formData.phoneNumber?.error}
                />
                <TextField
                  label="WhatsApp Number"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  error={!!formData.whatsappNumber?.error}
                  helperText={formData.whatsappNumber?.error}
                />
                <TextField
                  label="Personal Email ID"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.personalEmail}
                  onChange={(e) =>
                    handleInputChange("personalEmail", e.target.value)
                  }
                  error={!!formData.personalEmail?.error}
                  helperText={formData.personalEmail?.error}
                />
                <TextField
                  label="Current Address"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.currentAddress}
                  onChange={(e) =>
                    handleInputChange("currentAddress", e.target.value)
                  }
                  error={!!formData.currentAddress?.error}
                  helperText={formData.currentAddress?.error}
                />
                <TextField
                  label="Permanent Address"
                  variant="outlined"
                  style={fieldStyle}
                  value={formData.section1.permanentAddress}
                  onChange={(e) =>
                    handleInputChange("permanentAddress", e.target.value)
                  }
                  error={!!formData.permanentAddress?.error}
                  helperText={formData.permanentAddress?.error}
                />
                <TextField
                  label="Laptop (Yes/No)"
                  select
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section1.laptop}
                  onChange={(e) => handleInputChange("laptop", e.target.value)}
                  error={!!formData.laptop?.error}
                  helperText={formData.laptop?.error}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </>
            )}
            {currentSection === 1 && (
              <>
                {/* Section 2: Parents Details */}
                <TextField
                  label="Father's Name"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.fatherName}
                  onChange={(e) =>
                    handleInputChange("section2", "fatherName", e.target.value)
                  }
                />
                <TextField
                  label="Father's Profession"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.fatherProfession}
                  onChange={(e) =>
                    handleInputChange(
                      "section2",
                      "fatherProfession",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Mother's Name"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.motherName}
                  onChange={(e) =>
                    handleInputChange("section2", "motherName", e.target.value)
                  }
                />
                <TextField
                  label="Mother's Profession"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.motherProfession}
                  onChange={(e) =>
                    handleInputChange(
                      "section2",
                      "motherProfession",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Company"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.company}
                  onChange={(e) =>
                    handleInputChange("section2", "company", e.target.value)
                  }
                />
                <TextField
                  label="Parents Address"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section2.parentsAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "section2",
                      "parentsAddress",
                      e.target.value
                    )
                  }
                />
              </>
            )}
            {currentSection === 2 && (
              <>
                {/* Section 3: Authentication */}
                <TextField
                  label="Username"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section3.username}
                  onChange={(e) =>
                    handleInputChange("section3", "username", e.target.value)
                  }
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section3.password}
                  onChange={(e) =>
                    handleInputChange("section3", "password", e.target.value)
                  }
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  required
                  style={fieldStyle}
                  value={formData.section3.confirmPassword}
                  onChange={(e) =>
                    handleInputChange(
                      "section3",
                      "confirmPassword",
                      e.target.value
                    )
                  }
                />
              </>
            )}
            <div style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleNext}
                style={{ marginRight: "10px" }}
              >
                {currentSection === steps.length - 1
                  ? "Create Account and Pay"
                  : "Next"}
              </Button>
              {currentSection > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} />
    </Grid>
  );
};

export default Signup;
