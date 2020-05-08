/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Tag from "../Tag/Tag";
import InfoToolTip from "../formComponents/InfoToolTip";

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
        <div className="label-wrapper">
          <label className=" label create-log-name">Name of Log: </label>
          <InfoToolTip
            text={
              "Short descriptive title for your log, a title of an article or website or topic"
            }
          />
        </div>
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
        <div className="label-wrapper">
          <label className=" label label-alignment">Add a Tag: </label>
          <InfoToolTip
            text={
              "A Tag is a label or 1 word summary you associate a Log with. A Tag cannot have any space, number or special character"
            }
          />
        </div>

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
        <div className="label-wrapper">
          <label className="label">Add a URL:</label>
          <InfoToolTip
            text={"Link your source or bookmark it to get the full site"}
          />
        </div>
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
        <div className="label-wrapper">
          <label className="label">Add Info:</label>
          <InfoToolTip
            text={`Give your Log some descriptive information, or add some code snippet. 
              You can copy paste a phrase or paragraph that you find the most valuable from the link or website you bookmarked`}
          />
        </div>
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
        <div className="btn-group">
          {edit ? (
            <button className="btn-edit-log" type="submit">
              Edit
            </button>
          ) : (
            <button name="log-form" className="btn-create-log" type="submit">
              Create
            </button>
          )}
          <button
            onClick={() =>
              history.push(
                !edit ? `/dashboard` : `${history.location.pathname}`
              )
            }
            name="log-form"
            className="btn-back"
          >
            Back
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default CreateLog;
