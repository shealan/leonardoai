# My response to the Leonardo AI Code Challenge v3.5

## Overview

A simple web application that allows users to browse a paginated list of characters from the Rick & Morty universe. This functionality is accessible only to users who provide a valid username and job title.

## Tech Stack

- Next.js 15
- Chakra UI v3
- GraphQL
- TypeScript
- Vercel
- Leonardo AI (for background/header image)
- The Rick and Morty API (for character data)

## Features

- User authorisation (username and job title)
- Paginated list of characters
- Character details
- User profile (inc. updating function)

## Notes

### Dependencies

As per the instructions I have not used any additional dependencies outside of those required for Chakra UI, Apollo Client, and Next.js.

### User Data Approach

A simpler solution for storing the username and jobtitle would have been localStorage and a HoC but I wanted to demonstrate some proficiency with Next.js API routes and middleware. With no database or authentication system in place, server side cookie checking felt like the sweet spot for a little extra effort, and a lot more security.

## UI & Styling

As Chakra UI was specificed I have attempted to use it as much as possible for layout and styling. Beyond a few sensible defaults, I have not used any additional global/component level styles. If Chakra had not be specificed I would have used Tailwind CSS & ShadCN.
