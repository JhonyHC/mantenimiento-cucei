import { FAQ } from '@/Components/FAQ/FAQ';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Group, Stack, Title } from '@mantine/core';

const faqs = {
  admin: [
    {
      question: 'Puedes administrar reportes',
      answer:
        'En la sección de reportes puedes ver los reportes que han hecho los usuarios, así como editarlos y eliminarlos.',
    },
    {
      question: 'Aceptar soluciones',
      answer:
        'En la sección de soluciones puedes ver las soluciones propuestas por los usuarios de mantenimiento y aceptarlas en caso de que hayan sido resueltas.',
    },
    {
      question: 'Administrar infraestructuras',
      answer:
        'En la sección de infraestructuras puedes agregar nuevas infraestructuras (como edificios, laboratorios, etc.), así como editarlas y eliminarlas. Estas estructuras serán elegibles al momento de crear un reporte',
    },
  ],
  mantenimiento: [
    {
      question: 'Ver reportes',
      answer:
        'En la sección de reportes puedes ver los reportes que han hecho los usuarios, así como asignarte para resolverlos.',
    },
    {
      question: 'Proponer soluciones',
      answer:
        'En la sección de soluciones puedes ver las soluciones de los reportes.',
    },
  ],
  alumno: [
    {
      question: 'Hacer reportes',
      answer:
        'En la sección de reportes puedes hacer reportes sobre problemas que encuentres en las instalaciones de la universidad.',
    },
    {
      question: 'Agregar importancia al reporte',
      answer:
        'En la seccion de reportes verás un icono al cual le podras dar click para agregar importancia a un reporte de otro alumno reporte.',
    },
    {
      question: 'Hacer comentarios',
      answer:
        'Puedes agregar comentarios a los reportes de los alumnos o al tuyo.',
    },
  ],
};

export default function Dashboard({ auth }) {
  return (
    <>
      <Head title="Inicio" />
      <Title order={1}>Inicio</Title>
      <FAQ role={auth.user.role} faqs={faqs[auth.user.role]}></FAQ>
    </>
  );
}
