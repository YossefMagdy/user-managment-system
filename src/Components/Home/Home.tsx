import { useContext } from "react";
import StoreContext from "../../store/StoreContext";

export default function Home() {
  const { userInfo } = useContext(StoreContext);
  return (
    <>
      <div className="py-3 w-75 m-auto text-center rounded shadow mt-5">
        <h3 color="mb-5">
          welcome {userInfo.firstName} {userInfo.lastName}
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus,
          laboriosam harum quibusdam numquam dicta placeat, id vel quo ipsa,
          unde beatae. Fugit aliquid quaerat dolor sint maiores magni laborum.
        </p>
      </div>
    </>
  );
}
