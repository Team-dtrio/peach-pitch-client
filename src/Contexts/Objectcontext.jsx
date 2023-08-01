import { createContext, useState, useMemo, useCallback } from "react";

const ObjectContext = createContext();

function ObjectProvider({ children }) {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [selectedObjectType, setSelectedObjectType] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const selectObject = useCallback(
    (id, type, spec) => {
      if (selectedObjectId === id && selectedObjectType === type) {
        setSelectedObjectId(null);
        setSelectedObjectType(null);
        setSelectedObject(null);
      } else {
        setSelectedObjectId(id);
        setSelectedObjectType(type);
        setSelectedObject(spec);
      }
    },
    [selectedObjectId, selectedObjectType],
  );

  const deselectObject = useCallback(() => {
    setSelectedObjectId(null);
    setSelectedObjectType(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedObjectId,
      selectedObjectType,
      selectedObject,
      selectObject,
      deselectObject,
    }),
    [
      selectedObjectId,
      selectedObjectType,
      selectedObject,
      selectObject,
      deselectObject,
    ],
  );

  return (
    <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>
  );
}

export { ObjectContext, ObjectProvider };
