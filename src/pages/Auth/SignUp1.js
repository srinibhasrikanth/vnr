import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import NavbarH from "./NavbarH";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    // Your initial form data here
  });

  const handleInputChange = (field, value) => {
    const validationErrors = Object.entries(formData).reduce(
      (errors, [field, data]) => {
        if (!data.value) {
          errors[field] = "This field is required";
        } else if (field === "rollNo" && data.value.length !== 10) {
          errors[field] = "Roll No should be 10 characters";
        } else if (
          (field === "phoneNumber" || field === "whatsappNumber") &&
          !/^\d{10}$/.test(data.value)
        ) {
          errors[field] = "Enter a valid 10-digit number";
        } else if (
          field === "personalEmail" &&
          !/\S+@\S+\.\S+/.test(data.value)
        ) {
          errors[field] = "Enter a valid email address";
        }
        return errors;
      },
      {}
    );

    if (Object.keys(validationErrors).length > 0) {
      // Display validation errors
      console.log("Form has errors. Please fix them before submitting.");
      setFormData((prevData) => ({
        ...prevData,
        ...Object.keys(validationErrors).reduce((newData, field) => {
          newData[field] = {
            ...prevData[field],
            error: validationErrors[field],
          };
          return newData;
        }, {}),
      }));
    } else {
      // No validation errors, proceed with form submission
      console.log("Form submitted!");
      // Add logic to handle form data as needed
    }
  };

  const handleSubmit = () => {
    // Implement form submission logic here
    // Check if there are any validation errors before submitting
    const hasErrors = Object.values(formData).some((field) => !field.value);
    if (hasErrors) {
      console.log("Form has errors. Please fill in all required fields.");
      return;
    }

    console.log("Form submitted!");
    // Add logic to handle form data as needed
  };

  const fieldStyle = {
    marginBottom: "20px",
    width: "100%", // Adjust width for smaller fields
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Change to column layout
    alignItems: "center", // Center items
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  };

  const sectionStyle = {
    width: "100%", // Full width
    marginBottom: "30px", // Add margin between sections
  };

  const columnsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
    gridGap: "20px", // Add gap between columns
    width: "100%",
  };

  return (
    <div>
      <NavbarH />
      <div style={containerStyle}>
        {/* Section 1 */}
        <div style={sectionStyle}>
          <Typography variant="h5" mb={2}>
            Section 1: Personal Details
          </Typography>
          <div style={columnsContainerStyle}>
            {/* Fields for Section 1 */}
            {/* Name, Roll No, Year, Branch */}
            <TextField
              label="Name"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!formData.name?.error}
              helperText={formData.name?.error}
            />

            <TextField
              label="Roll No"
              variant="outlined"
              required
              style={fieldStyle}
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
              onChange={(e) => handleInputChange("admission", e.target.value)}
              error={!!formData.admission?.error}
              helperText={formData.admission?.error}
            >
              {["Regular", "LE"].map((admission) => (
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
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              error={!!formData.phoneNumber?.error}
              helperText={formData.phoneNumber?.error}
            />

            <TextField
              label="WhatsApp Number"
              variant="outlined"
              required
              style={fieldStyle}
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
              onChange={(e) => handleInputChange("laptop", e.target.value)}
              error={!!formData.laptop?.error}
              helperText={formData.laptop?.error}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            {/* Add more fields as needed */}
          </div>
        </div>

        {/* Section 2 */}
        <div style={sectionStyle}>
          <Typography variant="h5" mb={2}>
            Section 2: Parents Details
          </Typography>
          <div style={columnsContainerStyle}>
            {/* Fields for Section 2 */}
            <TextField
              label="Father's Name"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              error={!!formData.fatherName?.error}
              helperText={formData.fatherName?.error}
            />
            <TextField
              label="Profession"
              variant="outlined"
              style={fieldStyle}
              onChange={(e) =>
                handleInputChange("fatherProfession", e.target.value)
              }
              error={!!formData.fatherProfession?.error}
              helperText={formData.fatherProfession?.error}
            />
            <TextField
              label="Company"
              variant="outlined"
              style={fieldStyle}
              onChange={(e) => handleInputChange("company", e.target.value)}
              error={!!formData.company?.error}
              helperText={formData.company?.error}
            />
            <TextField
              label="Mother's Name"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              error={!!formData.motherName?.error}
              helperText={formData.motherName?.error}
            />
            <TextField
              label="Profession"
              variant="outlined"
              style={fieldStyle}
              onChange={(e) =>
                handleInputChange("fatherProfession", e.target.value)
              }
              error={!!formData.fatherProfession?.error}
              helperText={formData.fatherProfession?.error}
            />
            <TextField
              label="Company"
              variant="outlined"
              style={fieldStyle}
              onChange={(e) => handleInputChange("company", e.target.value)}
              error={!!formData.company?.error}
              helperText={formData.company?.error}
            />
            <TextField
              label="Father's WhatsApp Number"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) =>
                handleInputChange("fatherWhatsappNumber", e.target.value)
              }
              error={!!formData.fatherWhatsappNumber?.error}
              helperText={formData.fatherWhatsappNumber?.error}
            />

            <TextField
              label="Parents Address"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) =>
                handleInputChange("parentsAddress", e.target.value)
              }
              error={!!formData.parentsAddress?.error}
              helperText={formData.parentsAddress?.error}
            />
            {/* Add more fields for Section 2 */}
          </div>
        </div>

        {/* Section 3 */}
        <div style={sectionStyle}>
          <Typography variant="h5" mb={2}>
            Section 3: Authentication
          </Typography>
          <div style={columnsContainerStyle}>
            {/* Fields for Section 3 */}
            {/* Username, Password, etc. */}
            <TextField
              label="Username"
              variant="outlined"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("username", e.target.value)}
              error={!!formData.username?.error}
              helperText={formData.username?.error}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={!!formData.password?.error}
              helperText={formData.password?.error}
            />
            <TextField
              label="Re-enter Password"
              variant="outlined"
              type="password"
              required
              style={fieldStyle}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={!!formData.password?.error}
              helperText={formData.password?.error}
            />
            {/* Add more fields for Section 3 */}
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleSubmit}
              style={{ display: "block", margin: "auto", width: "fit-content" }}
            >
              Create Account and Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
