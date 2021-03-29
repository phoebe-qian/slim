import React, { Component } from "react";
import PropTypes from "prop-types";

/** Components */
import api from "../../google/api/GoogleCloudApi";
import ProjectsList from "./ProjectsList";

/** Styles */
import "./googleCloud.less";

export default class ProjectPicker extends Component {
  state = {
    error: null,
    loading: true,
    projects: [],
  };

  static propTypes = {
    onSelect: PropTypes.func,
    accessToken: PropTypes.string,
  };

  async componentDidMount() {
    api.setAccessToken(this.props.accessToken);
    const response = await api.loadProjects();

    if (response.isError) {
      this.setState({ error: response.message });
      return;
    }

    this.setState({
      projects: response.data.projects || [],
      filterStr: "",
      loading: false,
    });
  }

  render() {
    const { projects, loading, filterStr, error } = this.state;
    const { onSelect } = this.props;
    return (
      <div>
        <input
          className="form-control gcp-input"
          type="text"
          value={filterStr}
          onChange={(e) => this.setState({ filterStr: e.target.value })}
          placeholder="Search..."
        />
        <ProjectsList
          projects={projects}
          loading={loading}
          filter={filterStr}
          error={error}
          onSelect={onSelect}
        />
      </div>
    );
  }
}