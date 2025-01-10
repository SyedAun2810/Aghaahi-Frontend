import React, { createContext, useReducer } from "react";

import { generateUniqueId } from "@Utils/utils.service";
import { CONTEXT_ACTIONS, FORM_CONTEXT_IV } from "@Constants/app";

export const FormContext = createContext<any>({
  state: FORM_CONTEXT_IV,
  dispatch: () => null
});

const reducer = (state: any, action: any): any => {
  const { payload } = action;
  switch (action.type) {
    case CONTEXT_ACTIONS.ADD_TITLE_ID:
      return {
        ...state,
        titleIds: [...state.titleIds, payload.sectionId || ""]
      };

    case CONTEXT_ACTIONS.DELETE_TITLE_ID:
      return {
        ...state,
        titleIds: [...state?.titleIds].filter((id) => id !== payload.sectionId)
      };

    case CONTEXT_ACTIONS.UPDATE_TEXT_FIELD:
      return {
        ...state,
        formDetails: {
          ...state?.formDetails,
          [payload.key as string]: payload.value,
          [payload.errorKey as string]: ""
        }
      };

    case CONTEXT_ACTIONS.UPDATE_TITLE:
      return {
        ...state,
        formDetails: {
          ...state?.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === action.payload.id
              ? {
                  ...section,
                  title: action.payload.value ?? "",
                  titleError: ""
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.ADD_SECTION:
      return {
        ...state,
        formDetails: {
          ...state?.formDetails,
          sections: [
            ...state.formDetails.sections,
            {
              sectionId: generateUniqueId(),
              title: "",
              titleError: "",
              fields: {},
              fieldRequiredError: ""
            }
          ]
        }
      };

    case CONTEXT_ACTIONS.DELETE_SECTION:
      return {
        ...state,
        formDetails: {
          ...state?.formDetails,
          sections: [...state?.formDetails?.sections].filter((section) => section?.sectionId !== payload.sectionId)
        },
        titleIds: [...state?.titleIds].filter((id) => id !== payload.sectionId),
        selectedFieldId: null,
        selectedSectionId: null
      };

    case CONTEXT_ACTIONS.ADD_FIELD:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fieldRequiredError: "",
                  fields: {
                    ...section.fields,
                    [payload?.data?.id ?? payload?.id]: {
                      ...payload.data,
                      sectionId: payload?.sectionId
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.DELETE_FIELD:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) => {
            if (section.sectionId === payload.sectionId) {
              const deletedId = payload.id as string;
              const copy = { ...section.fields };
              delete copy[deletedId];
              return {
                ...section,
                fields: {
                  ...copy
                }
              };
            }
            return section;
          })
        },
        selectedFieldId: null,
        selectedSectionId: null
      };

    case CONTEXT_ACTIONS.SET_SELECTED_FIELD_ID:
      return {
        ...state,
        selectedFieldId: payload?.id,
        selectedSectionId: payload?.sectionId,
        selectedChildId: payload?.childId
      };

    case CONTEXT_ACTIONS.ADD_CHILD:
      const id = generateUniqueId();
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [
                        ...section.fields[payload.id as string]["options"],
                        {
                          id,
                          label: "",
                          value: id,
                          checked: false,
                          error: ""
                        }
                      ]
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.DELETE_CHILD:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [
                        ...section.fields[payload.id as string]["options"].filter(
                          (info: any) => info?.id !== payload.childId
                        )
                      ]
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.UPDATE_RADIO_CHILD:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [...section.fields[payload.id as string].options].map((child) =>
                        child.id === payload.childId
                          ? {
                              ...child,
                              [payload.key as string]: payload.value
                            }
                          : child
                      )
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.UPDATE_RADIO_VALUE:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [...section.fields[payload.id as string].options].map((child) => {
                        if (child.id === payload.childId) {
                          return {
                            ...child,
                            [payload.key as string]: payload.value
                          };
                        }

                        return child;
                      })
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.UPDATE_RADIO_CHECK:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [...section.fields[payload.id as string].options].map((child) =>
                        child.id === payload.childId
                          ? {
                              ...child,
                              checked: payload.checked ?? false
                            }
                          : {
                              ...child,
                              checked: false
                            }
                      )
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.UPDATE_CHECKBOX_CHECK:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      options: [...section.fields[payload.id as string].options].map((child) =>
                        child.id === payload.childId
                          ? {
                              ...child,
                              checked: payload.checked ?? false
                            }
                          : child
                      )
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.UPDATE_VALUE:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      [payload.key as string]: payload.value
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.SET_ERRORS:
    case CONTEXT_ACTIONS.SET_FORM_DETAILS:
      return {
        ...state,
        titleIds: [...state.titleIds, ...(payload.titleIds ? payload.titleIds : [])],
        formDetails: {
          ...state.formDetails,
          ...payload.formDetails
        }
      };

    case CONTEXT_ACTIONS.DRAG_SECTIONS:
      return {
        ...state,
        formDetails: {
          ...state?.formDetails,
          sections: payload.sections
        }
      };

    case CONTEXT_ACTIONS.DRAG_FIELDS:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: payload.fields
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.ADD_CONDITION:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fields: {
                    ...section.fields,
                    [payload.id as string]: {
                      ...section.fields[payload.id as string],
                      condition: {
                        ...payload.condition,
                        applyCondition: true
                      }
                    }
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.ADD_STANDARD_FIELD:
      const parsedFieldTemplate = JSON.parse(payload?.data?.template);

      const allFields = state?.formDetails?.sections?.reduce((acc: any, section: any) => {
        const sectionFieldIds = Object.keys(section.fields);
        return acc.concat(sectionFieldIds);
      }, []);

      Object.keys(parsedFieldTemplate)?.forEach((key: string) => {
        const newKey = generateUniqueId();
        if (allFields.includes(key)) {
          parsedFieldTemplate[newKey] = {
            ...parsedFieldTemplate[key],
            id: newKey
          };
          delete parsedFieldTemplate[key];
          parsedFieldTemplate[newKey].sectionId = payload?.sectionId;
          parsedFieldTemplate[newKey]["isStandardField"] = true;
        } else {
          parsedFieldTemplate[key].sectionId = payload?.sectionId;
          parsedFieldTemplate[key]["isStandardField"] = true;
        }
      });
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: [...state.formDetails.sections].map((section) =>
            section.sectionId === payload.sectionId
              ? {
                  ...section,
                  fieldRequiredError: "",
                  fields: {
                    ...section.fields,
                    ...parsedFieldTemplate
                  }
                }
              : section
          )
        }
      };

    case CONTEXT_ACTIONS.RE_ORDER_FIELDS:
      return {
        ...state,
        formDetails: {
          ...state.formDetails,
          sections: payload.sections
        }
      };

    default:
      return state;
  }
};

interface IProps {
  children: React.ReactNode;
}

export const FormContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, FORM_CONTEXT_IV);

  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};
