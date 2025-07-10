<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $area = htmlspecialchars(trim($_POST["area"]));
    $tiers = htmlspecialchars(trim($_POST["tiers"]));
    $question1 = $_POST["question-1"] === "yes" ? "tak" : "nie";
    $question2 = $_POST["question-2"] === "yes" ? "tak" : "nie";
    $question3 = $_POST["question-3"] === "yes" ? "tak" : "nie";
    $msg = htmlspecialchars(trim($_POST["msg"]));

    $to = "wenti.mim@gmail.com";
    $subject = "Nowa wiadomość z formularza kontaktowego na stronie Wenti MiM";

    $message = "
    <html>
    <head><meta charset='UTF-8'></head>
    <body>
        <p>Imię: <b>$name</b></p>
        <p>Numer telefonu: <b>$phone</b></p>
        <p>Email: <b>$email</b></p>
        <p>Powierzchnia użytkowa: <b>$area m<sup>2</sup></b></p>
        <p>Ilość kondygnacji: <b>$tiers</b></p>
        <p>Czy klient posiada projekt: <b>$question1</b></p>
        <p>Czy instalacja będzie znajdowała się w wylewce: <b>$question2</b></p>
        <p>Czy instalacja będzie podwieszona pod sufitem: <b>$question3</b></p>
        <p>Dodatkowe informacje:<br>$msg</p>
    </body>
    </html>";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Formularz Wenti MiM <mateusz-nigbor@wentimim.pl>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: kontakt.html?mail_status=sent");
        exit();
    } else {
        echo "Błąd podczas wysyłania wiadomości.";
    }
} else {
    echo "Nieprawidłowe żądanie.";
}
?>
