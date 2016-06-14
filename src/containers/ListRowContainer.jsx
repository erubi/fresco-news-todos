

  renderTodo = (key, todo, selected) => (
    <TodoRow
      key={key}
      todo={todo}
      selected={selected}
      toggleTodo={this.props.toggleTodo}
      updateTodo={this.props.updateTodo}
      selectTodo={(todoId) => this.selectTodo(todoId)}
    />
  );
