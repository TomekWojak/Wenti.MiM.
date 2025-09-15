<?php
$to = "wenti.mim@gmail.com";

$subject = "Nowa wiadomość z formularza kontaktowego na stronie Wenti MiM";

$contactOption = $_POST['contact-popup'] ?? '';
$contactInfo = $_POST['contact__popup-input'] ?? '';

$message = "Klient zaznaczył opcję: $contactOption\n";
$message .= "Dane kontaktowe do klienta: $contactInfo\n";

$headers = "From: Formularz Wenti MiM <mateusz-nigbor@wentimim.pl>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    header("Location: index.html?mail_status=sent");
} else {
    header("Location: index.html?mail_status=error");
}
exit;
?>
