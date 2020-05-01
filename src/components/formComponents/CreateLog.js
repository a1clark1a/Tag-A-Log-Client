/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Tag from "../Tag/Tag";

import Context from "../../context/ContextProvider";

import "./CreateLog.css";

const CreateLog = ({
  log_name,
  url,
  description,
  num_tags,
  edit,
  handleEditLog,
  handleCreateLog,
  currentTags,
}) => {
  const context = useContext(Context);
  const history = useHistory();
  const { tagList, setError, clearError } = context;
  const [newLog, setNewLog] = useState({
    log_name: log_name || "",
    url: url || "",
    description: description || "",
    num_tags: num_tags || 0,
  });
  const [tag, setTag] = useState("");
  const [addTagList, setAddTagList] = useState([]);
  const [tagsToDelete, setTagsToDelete] = useState([]);
  const [option, setOption] = useState({
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
  });

  useEffect(() => {
    if (currentTags.length > 0) {
      currentTags.forEach((tag) => {
        setAddTagList((addTagList) => [...addTagList, tag.tag_name]);
      });
    }
    if (history.action === "POP" && history.location.pathname === "/log") {
      history.push("/dashboard");
    }

    return () => {
      clearError();
    };
  }, []);

  const onChange = (e) => {
    clearError();
    const userInput = e.currentTarget.value;

    const filteredOptions = tagList.filter(
      (tag) => tag.tag_name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setOption({
      activeOption: 0,
      filteredOptions,
      showOptions: userInput !== "" ? true : false,
    });
    setTag(userInput.toLowerCase());
  };

  const onClick = (e) => {
    clearError();
    setOption({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
    });
    setTag(e.currentTarget.innerText.toLowerCase());
  };

  const onKeyDown = (e) => {
    clearError();
    const { activeOption, filteredOptions } = option;
    if (e.keyCode === 13) {
      setOption({
        ...option,
        activeOption: 0,
        showOptions: false,
      });
      setTag(filteredOptions[activeOption].tag_name);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setOption({
        ...option,
        activeOption: activeOption - 1,
      });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setOption({
        ...option,
        activeOption: activeOption + 1,
      });
    }
  };

  const displayOptionTags = () => {
    if (option.showOptions && tag) {
      if (option.filteredOptions.length > 0) {
        return option.filteredOptions.map((tag, i) => {
          return (
            <div
              className={`options-tag ${
                option.activeOption === i ? "option-active" : ""
              }`}
              key={i}
              onClick={onClick}
              tabIndex={i + 1}
            >
              {tag.tag_name}
            </div>
          );
        });
      } else {
        return <div>Create this tag</div>;
      }
    }
  };

  const onDeleteTag = (tagName) => {
    clearError();
    // eslint-disable-next-line array-callback-return
    const newLogsTags = addTagList.filter((tag) => {
      if (tag !== tagName) {
        return tag;
      }
      setTagsToDelete((elem) => [...elem, tag]);
    });

    setAddTagList(newLogsTags);
  };

  const displayAddedTags = () => {
    return addTagList.map((tag, i) => {
      return (
        <Tag key={i} tag_name={tag} onDeleteTag={() => onDeleteTag(tag)} />
      );
    });
  };

  const onClickAddTag = (e) => {
    if (addTagList.length < 5) {
      const constraint = /^[a-z]+$/g;
      if (!constraint.test(tag) || tag.length > 15) {
        setTag("");
        return setError(
          "Tag must not have a whitespace, number or special characters and not longer than 15 letters"
        );
      }
      if (tagsToDelete.includes(tag)) {
        const newTagsToDelete = tagsToDelete.filter((elem) => elem !== tag);
        setTagsToDelete(newTagsToDelete);
      }

      if (!addTagList.includes(tag)) {
        setAddTagList((elem) => [...elem, tag]);
      }
      setTag("");
      setOption({
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
      });
    } else {
      setError("Can only have upto 5 tags");
    }
  };

  return (
    <form
      className="log-form"
      onSubmit={(e) =>
        edit
          ? handleEditLog(e, addTagList, tagsToDelete)
          : handleCreateLog(e, addTagList)
      }
    >
      <fieldset className="log-fieldset">
        <label className=" label create-log-name">Name of Log: </label>
        <input
          name="log_name"
          id="log_name"
          aria-label="log_name"
          type="text"
          value={newLog.log_name}
          autoComplete="off"
          onChange={(e) =>
            setNewLog({
              ...newLog,
              log_name: e.target.value,
            })
          }
          required
        />
        <label className=" label ">Add a Tag: </label>
        <div className="add-tag-container">
          <div>
            <input
              type="text"
              name="tag"
              id="tag"
              aria-label="tag"
              autoComplete="off"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={tag}
            />
            <div
              className={`tag-options-wrapper ${
                option.showOptions ? "addBorder" : ""
              }`}
            >
              {displayOptionTags()}
            </div>
          </div>
          <button className="btn-add-tag" type="button" onClick={onClickAddTag}>
            Add
          </button>
        </div>

        <div className="added-tags-wrapper">{displayAddedTags()}</div>
        <label className="label">Add a URL:</label>
        <input
          name="url"
          id="url"
          aria-label="url"
          type="URL"
          value={newLog.url}
          onChange={(e) =>
            setNewLog({
              ...newLog,
              url: e.target.value,
            })
          }
        />
        <label className="label">Add Info:</label>
        <textarea
          name="description"
          id="description"
          aria-label="description"
          value={newLog.description}
          onChange={(e) =>
            setNewLog({
              ...newLog,
              description: e.target.value,
            })
          }
          required
        />
        {edit ? (
          <button className="btn-edit-log" type="submit">
            Edit
          </button>
        ) : (
          <button name="log-form" className="btn-create-log" type="submit">
            Create
          </button>
        )}
      </fieldset>
    </form>
  );
};

export default CreateLog;
