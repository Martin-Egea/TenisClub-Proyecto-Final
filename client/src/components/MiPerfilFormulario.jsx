import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "../context/UserContext";
import { useToast } from "@/hooks/use-toast";

// eslint-disable-next-line react/prop-types
export default function MiPerfilFormulario({ active }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const toggleMostrarContraseña = () =>
    setMostrarContraseña(!mostrarContraseña);

  const { user, updateUser } = useUser();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      domicilio: "",
      localidad: "",
      telefono: "",
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      // Crea una nueva fecha con el formato correcto
      // y si no tiene fecha de nacimiento la deja vacia
      const fechaNacimiento = user.fecha_nacimiento
        ? new Date(user.fecha_nacimiento)
        : "";
      // Agrega un día si la fecha es válida
      if (
        fechaNacimiento instanceof Date &&
        !isNaN(fechaNacimiento.getTime())
      ) {
        fechaNacimiento.setDate(fechaNacimiento.getDate() + 1);
      }

      // Actualiza los valores del formulario con los datos de `user`
      reset({
        nombre: user.nombre,
        apellido: user.apellido,
        fecha_nacimiento: fechaNacimiento,
        domicilio: user.domicilio,
        localidad: user.localidad,
        telefono: user.telefono,
        email: user.email,
        password: "",
      });
    }
  }, [user, reset]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const onSubmit = () => {
    if (form.formState.isValid) {
      setIsDialogOpen(true);
    } else {
      toast({
        title: "Error",
        description: "No se ha modificado un campo o hay campos invalidos!",
      });
    }
  };

  const handleConfirm = () => {
    //cambiando formato de la fecha
    const fechaOriginal = form.getValues().fecha_nacimiento;
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" }; // Formato deseado
    const fechaFormateada = new Intl.DateTimeFormat("es-AR", opciones).format(
      new Date(fechaOriginal)
    );

    const userUpdated = {
      _id: user.id,
      nombre: form.getValues().nombre,
      apellido: form.getValues().apellido,
      fecha_nacimiento: fechaFormateada,
      domicilio: form.getValues().domicilio,
      localidad: form.getValues().localidad,
      telefono: form.getValues().telefono,
      email: form.getValues().email,
      password: form.getValues().password,
    };

    updateUser(userUpdated);
    toast({
      description: "Perfil actualizado con exito!",
      variant: "success",
    });
    //console.log(user);
    setIsDialogOpen(false);
  };

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 min-h-[500px] min-w-[300px] animate-fade-left ${
        active ? "" : "hidden"
      }`}
    >
      <div className="grid grid-cols-1 gap-4 bg-white rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4">
          Actualizar Perfil
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-4 shadow-sm">
              <FormField
                control={form.control}
                name="nombre"
                rules={{ required: "El nombre es requerido" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={form.getValues().nombre}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido"
                rules={{ required: "El apellido es requerido" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={form.getValues().apellido}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fecha_nacimiento"
                value={form.getValues().fecha_nacimiento}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-[240px] pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="h-auto"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1930}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domicilio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input {...field} value={form.getValues().domicilio} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="localidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidad</FormLabel>
                    <FormControl>
                      <Input {...field} value={form.getValues().localidad} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} value={form.getValues().telefono} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "El email es requerido",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "El email no es válido",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        value={form.getValues().email}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                    required:
                      form.getValues().password &&
                      form.getValues().password !== ""
                        ? true
                        : false,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={mostrarContraseña ? "text" : "password"}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    validate: (value) =>
                      form.getValues().password
                        ? value === form.getValues().password ||
                          "Las contraseñas no coinciden"
                        : true,
                    required:
                      form.getValues().password &&
                      form.getValues().password !== ""
                        ? true
                        : false,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repetir Contraseña</FormLabel>
                      <FormControl>
                        <>
                          <Input
                            {...field}
                            type={mostrarContraseña ? "text" : "password"}
                            value={field.value || ""}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center pt-7">
                  <button
                    type="button"
                    onClick={toggleMostrarContraseña}
                    className="text-gray-500"
                  >
                    {mostrarContraseña ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button
                type="submit"
                className="min-w-52 w-1/3 font-bold bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
              >
                Actualizar Perfil
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="animate-fade animate-duration-300">
          <DialogHeader>
            <DialogTitle>Confirmar actualización</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea modificar su perfil?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className=" bg-green-400 text-slate-950 px-4 rounded-md hover:bg-green-500"
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
