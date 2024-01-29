import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "../../App";

afterEach(() => {
  cleanup();
});

describe("App component", () => {
  it("should render title and descriptions", () => {
    render(<App />);
    const h1 = screen.getByTestId("heading-todo");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/^To-Do List$/);
    const p = screen.getAllByTestId("to-do-description");
    expect(p[0]).toHaveTextContent(
      /^Enter text into the input field to add items to your list$/
    );
    expect(p[1]).toHaveTextContent(
      /^Click the "X" to remove the item from your list$/
    );
    expect(p[2]).toHaveTextContent(/^Click the item to mark it as complete.$/);
  });

  it("should render input and button", () => {
    render(<App />);
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");

    fireEvent(button, new MouseEvent("click"));
  });

  it("should not add a new item when the input is empty", async () => {
    // [JSX] Mô phỏng render ra component App 
    render(<App />);

    // [HTML] Lấy ra các element sau khi render
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");
    const taskListContainerDiv = screen.getByTestId("task-list-container");

    // Kiểm tra xem có đúng là input value lúc đầu bỏ trống hay không
    expect(input).toHaveValue("");

    // Mô phỏng người dùng click vào button (khi chưa nhập gì vào input)
    // Điều xảy ra phía dưới (Unit test không kiểm soát được): function `addTask()` được gọi
    fireEvent.click(button);


    // Kiểm tra thẻ <div> chứa các Task không có element con nào. (Là một thẻ div trống)
    expect(taskListContainerDiv).toBeEmptyDOMElement();
  });

  it("should add a new item when the input is not empty", async () => {
    render(<App />);
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");
    const taskListContainerDiv = screen.getByTestId("task-list-container");

    // Mô phỏng người dùng nhập vào ô input "abc"
    fireEvent.change(input, { target: { value: "abc" } });

    // Sau khi gõ "abc", kiểm tra xem value của input có phải là 'abc' hay không
    expect(input).toHaveValue("abc");

    // Mô phỏng người dùng click vào button thêm
    fireEvent.click(button);  

    // Kiểm tra thẻ <div> chứa các Task không có element con nào. (Là một thẻ div trống)
    expect(taskListContainerDiv).not.toBeEmptyDOMElement();

    // Kiểm tra sau khi nhấn button thêm task thì sẽ clear dữ liệu cũ của ô input
    expect(input).toHaveValue("");
  });

  it('should showing icon remove item when clicked after item was addition', () => {
    render(<App />);
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");

    fireEvent.change(input, { target: { value: "Something" } });

    expect(input).toHaveValue("Something");

    fireEvent.click(button);

    const itemSomething = screen.getByText("Something");
    //kiểm tra xem HTML ELement item này có tồn tại trong danh sách hay không
    expect(itemSomething).toBeInTheDocument();

    const remove = screen.getByTestId("button-remove-item");
    //kiểm tra xem HTML ELement này có tồn tại trong danh sách hay không
    expect(remove).toBeInTheDocument();
  });


  it('should change text complete item when clicked after item was addition', () => {
    render(<App />);
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");

    fireEvent.change(input, { target: { value: "Something" } });

    expect(input).toHaveValue("Something");

    fireEvent.click(button);

    const itemSomething = screen.getByText("Something");
    //kiểm tra xem HTML ELement item này có tồn tại trong danh sách hay không
    expect(itemSomething).toBeInTheDocument();

    const remove = screen.getByTestId("button-remove-item");
    //kiểm tra xem HTML ELement này có tồn tại trong danh sách hay không
    expect(remove).toBeInTheDocument();

    
    const toggleComplete = screen.getByTestId("toggle-complete");
    expect(toggleComplete).toBeInTheDocument();

    fireEvent.click(toggleComplete);
    expect(toggleComplete).toHaveTextContent("Something(completed)");
  });

  it('should remove item when clicked after item was addition', () => {
    render(<App />);
    const input = screen.getByTestId("text-input-todo");
    const button = screen.getByTestId("button-todo-addtion");

    fireEvent.change(input, { target: { value: "Something" } });

    expect(input).toHaveValue("Something");

    fireEvent.click(button);

    const itemSomething = screen.getByText("Something");
    //kiểm tra xem HTML ELement item này có tồn tại trong danh sách hay không
    expect(itemSomething).toBeInTheDocument();

    const remove = screen.getByTestId("button-remove-item");
    //kiểm tra xem HTML ELement này có tồn tại trong danh sách hay không
    expect(remove).toBeInTheDocument();

    fireEvent.click(remove);
    //kiểm tra rằng value item còn tồn tại hay không
    expect(itemSomething).not.toHaveValue("");
    //kiểm tra chắc chắn rằng item không còn tồn tại trong  item list nữa
    expect(itemSomething).not.toBeInTheDocument();
  });

});
