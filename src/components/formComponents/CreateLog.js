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
  const { tagList } = context;
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

    if (history.action === "POP") {
      history.push("/dashboard");
    }
  }, []);

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    const filteredOptions = tagList.filter(
      (tag) => tag.tag_name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setOption({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
    });
    setTag(e.currentTarget.value);
  };

  const onClick = (e) => {
    setOption({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
    });
    setTag(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
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
            <p key={i} onClick={onClick}>
              {tag.tag_name}
            </p>
          );
        });
      } else {
        return <div>Create this tag</div>;
      }
    }
  };

  const onDeleteTag = (tagName) => {
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
        <label>Name of log: </label>
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
        <label>Add a tag: </label>
        <div className="add-tag-container">
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
          <button
            type="button"
            onClick={(e) => {
              setAddTagList((elem) => [...elem, tag]);
              setTag("");
              e.currentTarget.value = "";
            }}
          >
            add
          </button>
          <div className="added-tags-wrapper">{displayAddedTags()}</div>
        </div>
        <div>{displayOptionTags()}</div>
        <label>Add a url:</label>
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
          <button className="create-log" type="submit">
            Edit
          </button>
        ) : (
          <button name="log-form" className="edit-log" type="submit">
            Create
          </button>
        )}
      </fieldset>
    </form>
  );
};

export default CreateLog;
