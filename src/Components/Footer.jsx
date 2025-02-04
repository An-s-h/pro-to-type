import React, { useState } from 'react'
import Select from 'react-select'
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from '../Contexts/ThemeContext'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
const Footer = () => {
  const { setTheme, theme } = useTheme()

  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value))
  }

  return (
    <div className='footer'> 
      <div className="links">
      <XIcon/>
      <span className='w-1'> </span>
      <GitHubIcon/>
      <span className='w-1'> </span>
      <LinkedInIcon/>
      </div>
      <div>
        Press <span className='font-bold'>TAB + ENTER</span> for quick reset
      </div>
      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement='top'
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: theme.background, // Use theme's background color
              borderColor: state.isFocused ? theme.textColor : theme.textColor,  // Set border color to textColor on focus
              color: theme.textColor, // Set input text color to textColor
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme.background, 
              color:'yellow', // Change the text color of the input b // Use theme's background for the dropdown
            }),
            option: (baseStyles, { isFocused, isSelected }) => ({
              ...baseStyles,
              backgroundColor: isSelected
                ? theme.textColor
                : isFocused
                ? theme.textColor
                : theme.background,  // Use primary color for focused options
              color: isSelected
                ? theme.background
                : isFocused
                ? theme.background
                : theme.textColor,  // Use background color for selected options
              cursor: 'pointer',
            }),
          }}
          classNames={{
            control: (state) =>
              state.isFocused ? 'custom-control-focused' : 'custom-control', // Add custom classes for focused state
            menu: () => 'custom-menu',  // Custom class for menu
            option: (state) =>
              state.isFocused ? 'custom-option-focused' : 'custom-option', // Add custom classes for options
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: theme.textColor,  // Set primary color to match textColor
              neutral0: theme.background, // Set background color to match theme
              neutral5: theme.background,
            },
          })}
        />
      </div>
    </div>
  )
}

export default Footer
