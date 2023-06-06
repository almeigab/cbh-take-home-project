# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assuming that the tables schemas are similar to this:

Facility
- id
- ...

Shift
- id
- facility_id `FK Facility`
- agent_id `FK Agent`
- ...

Agent
- id
- ...

1 - Create a new table `FacilityAgent`
- Implementation details
    Create a migration that creates the table `FacilityAgent` in our database, with the following columns:
        - custom_id varchar NOT NULL
        - facility_id `FK Facility` NOT NULL
        - agent_id `FK Agent` NOT NULL
- Acceptance criteria
    The table should be crated with the 3 columns, such as it was specified above.
- Time/effort estimates
    Small

2 - Create new endpoint to register agent's custom id on the API
- Implementation details
    Create a repository connection to the table `FacilityAgent`
    Create a service that creates or update an entry into `FacilityAgent`, given the `facility_id`, the `agent_id` and the new `custom_id`
    Create a controller to the new endpoint `POST facility/:facility_id/agent/:agent_id/custom_id`

- Acceptance criteria
    It should be able to create new custom id to an agent for a given facility
    If there already is a custom id for this agent-facility, it should be updated
- Time/effort estimates
    Medium

3 - Update the function `generateReport` to consider custom id
- Implementation details
    Create a service that retrieves an entry from `FacilityAgent`, given the `facility_id`, the `agent_id`
    Update the function `generateReport` to retrieve custom ids using this new service, for every agent listed

- Acceptance criteria
    It should show the custom id for the agents, if there is. Otherwise, show the internal id.
- Time/effort estimates
    Medium
