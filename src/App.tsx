import { useFieldArray, useForm } from "react-hook-form";

// sub-question field array
const NestedArray = ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `assessment[${nestIndex}].subQuestion`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id}>
            <label>Sub Question:</label>
            <input
              name={`assessment[${nestIndex}].subQuestion[${k}].field1`}
              {...register(
                `assessment[${nestIndex}].subQuestion[${k}].field1`,
                { required: true }
              )}
              // @ts-ignore
              defaultValue={item?.field1}
              style={{ marginRight: "25px" }}
            />

            <input
              name={`assessment[${nestIndex}].subQuestion[${k}].field2`}
              {...register(
                `assessment[${nestIndex}].subQuestion[${k}].field2`,
                { required: true }
              )}
              // @ts-ignore
              defaultValue={item?.field2}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            field1: "",
            field2: "",
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  );
};

// High level question field array
function FieldArray({ control, register, setValue, getValues }: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "assessment",
  });

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                name={`assessment[${index}].name`}
                {...register(`assessment[${index}].name`)}
                // @ts-ignore
                defaultValue={item.name}
              />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: "High level question" });
          }}
        >
          Append Question
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("assessment", [
              ...getValues().assessment,
              {
                name: "append",
                subQuestion: [{ field1: "append", field2: "append" }],
              },
            ]);
          }}
        >
          Append Sub Question
        </button>
      </section>
    </>
  );
}

const defaultValues = {
  assessment: [
    {
      name: "High level question 1",
      subQuestion: [{ field1: "Question 1", field2: "Answer 1" }],
    },
    {
      name: "High level question 2",
      subQuestion: [{ field1: "Question 2", field2: "Answer 2" }],
    },
  ],
};

function App() {
  const { control, register, handleSubmit, getValues, reset, setValue } =
    useForm({ defaultValues });

  const onSubmit = (data: any) => console.log("data", data);
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Array of Array Fields</h1>
        <p>
          The following example demonstrate the ability of building nested array
          fields.
        </p>

        <FieldArray
          {...{ control, register, defaultValues, getValues, setValue }}
        />

        <button type="button" onClick={() => reset(defaultValues)}>
          Reset
        </button>

        <input type="submit" />
      </form>
    </main>
  );
}

export default App;
