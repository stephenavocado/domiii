import React from "react";
import { DEFAULT_ATTRIBUTES } from "../../data";
export const ModelContext = React.createContext();

function ModelProvider({ children }) {
  const [projects, setProjects] = React.useState([]);
  const [models, setModels] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("models")) || [];
  });
  const [associations, setAssociations] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("associations")) || [];
  });
  const [error, setError] = React.useState(null);
  const [prettyMode, setPrettyMode] = React.useState(false);

  React.useEffect(() => {
    window.localStorage.setItem("models", JSON.stringify(models));
  }, [models]);

  React.useEffect(() => {
    window.localStorage.setItem("associations", JSON.stringify(associations));
  }, [associations]);

  function createProject() {
    const newProject = {
      id: Math.random(),
      name: "New Project"
    };
    setProjects([newProject, projects]);
  }

  function createModel() {
    const newModel = {
      id: Math.random(),
      name: "",
      attributes: DEFAULT_ATTRIBUTES,
      position: {}
    };
    const newModels = [...models, newModel];
    setModels(newModels);
  }

  function setModelPosition(windowPosition, modelId) {
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              position: windowPosition
            }
          : model
      )
    );
  }

  function deleteModel(modelId) {
    setAssociations((prevAssociations) =>
      prevAssociations.filter(
        (association) => !Object.values(association).includes(modelId)
      )
    );
    setModels((prevModels) =>
      prevModels.filter((model) => model.id !== modelId)
    );
  }

  function editModel(value, modelId) {
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              name: value
            }
          : model
      )
    );
  }

  function checkForeignKey(attribute, childId) {
    const modelIdNames = models.map((model) => `${model.name.toLowerCase()}`);

    if (modelIdNames.includes(attribute)) {
      const modelIndex = modelIdNames.findIndex((item) => item === attribute);
      const modelId = models[modelIndex].id;

      const newAssociation = {
        id: Math.random(),
        ownerId: modelId,
        childId: childId
      };

      setAssociations((prevAssociations) => [
        ...prevAssociations,
        newAssociation
      ]);

      return newAssociation.id;
    } else {
      return false;
    }
  }

  function createAttribute(attribute, modelId) {
    const associationId = checkForeignKey(attribute, modelId);

    const newAttribute = {
      id: Math.random(),
      name: attribute,
      type: "tertiary",
      required: false,
      associationId: associationId ? associationId : null,
      dataType: associationId ? null : "string"
    };

    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              attributes: [...model.attributes, newAttribute]
            }
          : model
      )
    );
  }

  function changeAttributeDataType(attribute, modelId) {
    const dataTypes = ["string", "number", "date", "boolean"];
    const dataTypeLength = dataTypes.length - 1;

    const isMatching = (element) => element === attribute.dataType;

    const index = dataTypes.findIndex(isMatching);

    if (index === dataTypeLength) {
      const nextIndex = 0;
      const nextDataType = dataTypes[nextIndex];

      setModels((prevModels) =>
        prevModels.map((model) =>
          model.id === modelId
            ? {
                ...model,
                attributes: model.attributes.map((item) =>
                  item.id === attribute.id
                    ? { ...item, dataType: nextDataType }
                    : item
                )
              }
            : model
        )
      );
    } else {
      const nextIndex = index + 1;
      const nextDataType = dataTypes[nextIndex];

      setModels((prevModels) =>
        prevModels.map((model) =>
          model.id === modelId
            ? {
                ...model,
                attributes: model.attributes.map((item) =>
                  item.id === attribute.id
                    ? { ...item, dataType: nextDataType }
                    : item
                )
              }
            : model
        )
      );
    }
  }

  function deleteAttribute(attribute, modelId) {
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              attributes: model.attributes.filter(
                (item) => item.id !== attribute.id
              )
            }
          : model
      )
    );

    setAssociations((prevAssociations) =>
      prevAssociations.filter(
        (association) => association.id !== attribute.associationId
      )
    );
  }

  return (
    <ModelContext.Provider
      value={{
        projects,
        createProject,
        models,
        setModels,
        associations,
        setAssociations,
        createModel,
        deleteModel,
        editModel,
        checkForeignKey,
        createAttribute,
        changeAttributeDataType,
        deleteAttribute,
        setModelPosition,
        error,
        setError,
        prettyMode,
        setPrettyMode
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;
