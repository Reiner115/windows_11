export function checkIfObjectHasChildWithName(object, name) {
    for (let i = 0; i < object.children.length; i++) {
      if (object.children[i].fileName == name) {
        return { ...object.children[i] };
      }
    }
    return false;
  }


  export function findObjectByName(arr, name) {
      
    for (let i = 0; i < arr.length; i++) {
      const currentObject = arr[i];
      if (currentObject.fileName == name) {
        // Found the object, return it
        return currentObject;
      } else if (currentObject.hasOwnProperty("children") && currentObject.children.length > 0) {
        // Recursively search in the children
        const foundInChildren = findObjectByName(currentObject.children, name);
        if (foundInChildren) {
          return foundInChildren; // If found in children, return it
        }
      }
    }
    
    // Object not found
    return null;
  }