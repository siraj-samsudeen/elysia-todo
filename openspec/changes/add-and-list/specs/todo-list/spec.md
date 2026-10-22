## ADDED Requirements

### Requirement: See the list
The app SHALL show a page with an input for a new to-do and the list of to-dos.

#### Scenario: First open shows an empty list
- **GIVEN** the app has just started
- **WHEN** I open the app
- **THEN** I see the input for a new to-do
- **AND** the list is empty

### Requirement: Add a to-do
Typing a to-do and pressing Enter SHALL add it to the end of the list and clear the input.

#### Scenario: Add the first to-do
- **GIVEN** the list is empty
- **WHEN** I type "Read the guide on routing" and press Enter
- **THEN** the list shows "Read the guide on routing"
- **AND** the input is empty

#### Scenario: To-dos keep the order they were added
- **GIVEN** the list shows "Read the guide on routing"
- **WHEN** I type "Write the first test for the to-do API" and press Enter
- **THEN** the list shows, in this order:
  1. Read the guide on routing
  2. Write the first test for the to-do API

### Requirement: Keep the list on reload
There SHALL be one list, shared by everyone who opens the app, kept for as long as the app is
running.

#### Scenario: Reloading the page keeps the list
- **GIVEN** I have added "Read the guide on routing"
- **WHEN** I reload the page
- **THEN** the list shows "Read the guide on routing" once

### Requirement: Trim the text
The text of a new to-do SHALL be trimmed of leading and trailing whitespace before it is added.

#### Scenario: Surrounding spaces are removed
- **GIVEN** the list is empty
- **WHEN** I type "   Read the guide on routing   " and press Enter
- **THEN** the list shows "Read the guide on routing"

### Requirement: Ignore blank entries
Blankness SHALL be checked after trimming: an entry that is empty or only whitespace adds nothing.

#### Scenario: An empty entry adds nothing
- **GIVEN** the list is empty
- **WHEN** I press Enter without typing anything
- **THEN** the list is still empty

#### Scenario: A whitespace-only entry adds nothing
_Why a separate scenario: it catches checking for blanks before trimming, which passes every other
scenario but adds an empty to-do._
- **GIVEN** the list is empty
- **WHEN** I type "   " and press Enter
- **THEN** the list is still empty
