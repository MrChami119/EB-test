<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Invalid request method.']]);
    exit;
}

$firstName = trim($_POST['firstName'] ?? '');
$lastName  = trim($_POST['lastName'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$comments  = trim($_POST['comments'] ?? '');
$terms     = isset($_POST['terms']) && $_POST['terms'] === 'on';

$errors = [];

if ($firstName === '') {
    $errors['firstName'] = 'First name is required.';
}

if ($lastName === '') {
    $errors['lastName'] = 'Last name is required.';
}

if ($email === '') {
    $errors['email'] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}

if ($comments === '') {
    $errors['comments'] = 'Comments are required.';
}

if (!$terms) {
    $errors['terms'] = 'You must agree to the Terms & Conditions.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$submission = [
    'id'        => uniqid('sub_', true),
    'firstName' => $firstName,
    'lastName'  => $lastName,
    'email'     => $email,
    'phone'     => $phone,
    'comments'  => $comments,
    'submittedAt' => date('c'),
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? '',
];

$dataDir  = __DIR__ . '/data';
$dataFile = $dataDir . '/submissions.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$existing = [];
if (file_exists($dataFile)) {
    $contents = file_get_contents($dataFile);
    $existing = json_decode($contents, true);
    if (!is_array($existing)) {
        $existing = [];
    }
}

$existing[] = $submission;

$fp = fopen($dataFile, 'c+');
if ($fp && flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, json_encode($existing, JSON_PRETTY_PRINT));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Could not save your submission. Please try again.']]);
    exit;
}

$adminEmails = [
    'dumidu.kodithuwakku@ebeyonds.com',
    'prabhath.senadheera@ebeyonds.com',
];

$fromAddress = 'no-reply@ebeyonds.com'; 

$userSubject = 'We received your message - eBEYONDS Movie Library';
$userBody =
    "Hi {$firstName},\n\n" .
    "Thank you for reaching out to us. We've received your message and will get back to you shortly.\n\n" .
    "Here's a copy of what you submitted:\n" .
    "Comments: {$comments}\n\n" .
    "Best regards,\nMovie Library Team";

$userHeaders = "From: eBEYONDS Movie Library <{$fromAddress}>\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

$userMailSent = @mail($email, $userSubject, $userBody, $userHeaders);

$adminSubject = 'New Contact Form Submission';
$adminBody =
    "A new contact form submission was received:\n\n" .
    "First Name: {$firstName}\n" .
    "Last Name: {$lastName}\n" .
    "Email: {$email}\n" .
    "Phone: " . ($phone !== '' ? $phone : 'N/A') . "\n" .
    "Comments: {$comments}\n" .
    "Submitted At: {$submission['submittedAt']}\n";

$adminHeaders = "From: eBEYONDS Movie Library <{$fromAddress}>\r\n" .
                "Content-Type: text/plain; charset=UTF-8\r\n";

$adminMailSent = @mail(implode(',', $adminEmails), $adminSubject, $adminBody, $adminHeaders);

echo json_encode([
    'success' => true,
    'message' => 'Thanks! Your message has been received.',
    'mail' => [
        'userMailSent'  => $userMailSent,
        'adminMailSent' => $adminMailSent,
    ],
]);