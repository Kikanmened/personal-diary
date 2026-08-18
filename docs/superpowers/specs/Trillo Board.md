1. Set up React Vite Application:

### **Checklist**

* Create a directory for the app  
* run the npm create vite@latest command  
* Install tailwind  
* Install daisyUI (if wanted)  
* Create the components folder  
* Create the context folder (if using context)  
* Create the Storage folder  
* Delete the public folder  
* Delete the content in the assets folder  
* Delete the App.css  
* Delete the content on index.css (when adding the tailwindcss config)  
* Initialize the repo with the git init  
* Create the first commit

2. Create Git Repo:

### **Checklist**

* Set the repo to public  
* Needs to be empty in the beginning  
* Add the connection to the local repository  
* Add collaborators  
*   
3. Add PR reviews:

### **Checklist**

Create dev from main  
Push dev into the remote  
Create dev and main protection rules with at least 1 approvals

4. Create the EntriesContext

### **Checklist**

* Create in the context folder the file EntriesContext.js  
* Import createContext and useContext  
* Add the EntriesContext variable and call the createContext  
* Create the useEntries function activating the context  
* Export both elements  
*   
5. Create the EntriesState

### **Checklist**

* Create in the context folder the file EntriesStates.jsx  
* Import EntriesContext  
* Create the EntriesStates component  
* Import useState  
* Create the entries state and store the array of entries retrieved from localStorage or an empty array  
* Create the entry state to have an entry object stored in there (you can use this state to handle the add entry form)  
* Create a showAddEntryForm state set to false initiative that updates to true when the AddEntryBtn is clicked.  
* Create a showEntryModal state set to false initially and set to true when a card is clicked.  
* Create a loading state to display the loading of the elements if not retrieve yet  
* Create an error state to display error messages, like if an entry with the same date as other already in the array has been submitted in the form.  
* In the EntriesState component return the EntriesContext.Provider with the children props pass in the middle  
* Add the value attribute to the EntriesContext.Provider opening tag and add the states there as an object  
    
    
  Under Personal Data  
1. Store array of entries

### **Checklist**

* The array needs to be store under the key “entries”  
* It needs to pass the value as parameter  
* It needs to stringify the value that is been store in the "entries" key in localStorage  
2. Retrieve array of entries:

### **Checklist**

* Retrieves the array stored in localStorage under the key "entires"  
* If there are no "entries" it returns \[\]  
* If there are "entries", it returns the parsed array of entries.  
*   
* 3\. Remove one Item and Store again:

### **Checklist**

* Receive the entries array as a parameter  
* Receive the entry to be removed as a parameter  
* Filter all of the entries that do not match the entry pass in the parameter  
* Store in localStorage the filtered new array under the key "entries"  
*   
* 4\. Update one Item and Store again

### **Checklist**

* Need to receive the value of the entries array  
* Need to receive the value of the entry to update as parameter  
* Map over the array and update the item that matches the entry paramete  
* Store the mapped copy into the localStorage under the key "entries"

* Under CREATE NEW ENTRY

1.Add the entry button:

### **Checklist**

* Create the EntryBtn.jsx  
* Create the EntryBtn component  
* Export the component as default  
* Create a button and style it  
* Create an onClick event that renders conditionally the Form to add the entry (you will need a state that you update to true in here)

2\. Creating the form

### **Checklist**

* Create the AddEntryForm.jsx  
* Create the AddEntryForm component  
* Export the AddEntryForm by default  
* Create the form with the inputs for the Title, the date, the Image URL and the content  
* Create the states to handle those inputs  
* Add the value to the input and give the state variable as its value  
* Add the onChange event to the inputs to track the update of the input value  
* Add a onSubmit event that prevents the default (continue in the validation task)  
* 

3.Submitting the form:

### **Checklist**

* Validate that the inputs aren't empty  
* Validate the date of the entry to check if there is already an entry for that day. If there is, show error message, if there isn't, submit the form  
* Create a new entry object with the properties title, date, imageURL and content and store the information of the states created for the inputs.  
* Update the entries array state by adding the new entry object  
* Update the localStorage array to have the new entries array with the added object.  
* Reset the inputs states to be empty strings

Under Entry Display

1. Create card component:

### **Checklist**

* Create the EntryCard.jsx  
* create the EntryCard component  
* Export the EntryCard as default  
* The EntryCard receives the props object with the properties of title, date, imageUrl and content  
* The EntryCard displays in the jsx a card with all of the data in the properties object  
*   
2. Create HomePageList Component:

### **Checklist**

* Create the HomepageList.jsx  
* Import the EntryCard component at the top  
* Create the HomepageList component  
* Export the component by default  
* The HomepageList needs to receive the array of entries.  
* Returns an \<ul\> element  
* Inside the \<ul\> we map over the array of entries state and for each entry, we return the EntryCard component (passing the entries title, date, imageUrl and title as a props)

3. Add entry modal:

### **Checklist**

* Control the display of the entry modal by clicking the card  
* The entry needs to display the title, the date, the image and the content of the clicked card  
* Each piece of information should be updatable through inputs and stored in the localStorage array


  


  

